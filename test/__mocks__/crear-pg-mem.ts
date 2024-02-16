import { newDb } from 'pg-mem';

import fs from 'fs';
import path from 'path';
export const crearDB = () => {
    const dbmem = newDb();

    dbmem.public.interceptQueries((sql) => {
        let newSql = sql.replace(/\bnumeric\s*\(\s*\d+\s*,\s*\d+\s*\)/g, 'float');
        newSql = newSql.replace(/serial4/g, 'serial');
        newSql = newSql.replace(/int8/g, 'int');
        newSql = newSql.replace(/int2/g, 'int');
        newSql = newSql.replace(/_int4/g, 'int[]');

        if (sql !== newSql) {
            return dbmem.public.many(newSql);
        }
        return null;
    });

    try {
        const sqlTablas = fs.readFileSync(path.join(__dirname, './bd_tablas.sql'), 'utf8');
        const sqlinsert = fs.readFileSync(path.join(__dirname, './bd_insert.sql'), 'utf8');
        dbmem.public.none(sqlTablas + sqlinsert);
    } catch (err) {
        console.error(err);
    }

    const pg = dbmem.adapters.createPgPromise();
    pg.connect();
    return pg;
};
