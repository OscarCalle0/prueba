import redis, { RedisClient } from 'redis';
import { promisify } from 'util';
import { injectable } from 'inversify';
import { info } from 'console';
import { REDIS_HOST, REDIS_PORT, REDIS_TIEMPO_VENCIMIENTO } from '@util';

@injectable()
export class Redis {
    private readonly TIEMPO_VENCIMIENTO_BASE = parseInt(REDIS_TIEMPO_VENCIMIENTO);

    public async createClient(): Promise<RedisClient> {
        return new Promise<RedisClient>((resolve, reject) => {
            const client = redis.createClient({
                port: REDIS_PORT,
                host: REDIS_HOST,
                connect_timeout: 5000,
            });

            client.on('error', (error) => {
                console.error('Redis connection error:', error.message);
                reject(new Error(error.message));
            });

            client.on('connect', () => {
                info('Connected to Redis');
                resolve(client);
            });
        });
    }

    async get<T>(key: string, parseValue = true): Promise<T | null> {
        let client: RedisClient | null = null;

        try {
            client = await this.createClient();
            const getAsync = promisify(client.get).bind(client);
            const value = await getAsync(key);
            if (!value) {
                return null;
            }
            const parsedValue = parseValue ? JSON.parse(value) : value;
            return parsedValue as unknown as T;
        } catch (error) {
            console.error('Redis get error:', error);
            return null;
        } finally {
            if (client) {
                client.quit();
            }
        }
    }
    async set<T>(key: string, value: T, expireTime = this.TIEMPO_VENCIMIENTO_BASE): Promise<void> {
        let client: RedisClient | null = null;

        try {
            client = await this.createClient();
            const data = typeof value === 'object' ? JSON.stringify(value) : String(value);

            const setAsync = promisify(client.set).bind(client);
            const reply = await setAsync(key, data);

            if (reply !== 'OK') {
                throw new Error(`Redis SET command failed: ${reply}`);
            }

            const expireAsync = promisify(client.expire).bind(client);
            await expireAsync(key, expireTime);
        } catch (error) {
            console.error('Redis set error:', error);
        } finally {
            if (client) {
                client.quit();
            }
        }
    }
}
