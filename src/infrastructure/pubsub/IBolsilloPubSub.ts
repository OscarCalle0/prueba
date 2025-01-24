import { IPubSubRecaudoBolsillo } from './pubsub/interfaces/IBolsilloPubSub';

export interface IBolsilloPubSubRepository {
    publicarBolsillo(model: IPubSubRecaudoBolsillo): Promise<string>;
}
