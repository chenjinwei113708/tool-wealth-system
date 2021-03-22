import moment from 'moment';
import db from 'lib/db';

const TABLE_NAME = 't_account';

export default {
  async create (params: {
    role_id?: number,
    is_admin?: 0 | 1,
    username: string,
    create_user: string,
  }) {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const createData = {
      ...params,
      create_time: currentTime,
      update_time: currentTime,
    }
    const res = await db.createQuery({
      query: 'INSERT INTO ?? SET ?;',
      params: [TABLE_NAME, createData]
    });
    return res;
  },

  async update (id: number, params: {
    role_id?: number,
    is_admin?: 0 | 1,
    update_user: string,
  }) {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const updateData = {
      ...params,
      update_time: currentTime,
    }
    const res = await db.createQuery({
      query: 'UPDATE ?? SET ?, data_version=data_version+1 WHERE id=?;',
      params: [TABLE_NAME, updateData, id]
    });
    return res;
  },

  async delete (id: number) {
    const res = await db.createQuery({
      query: 'DELETE FROM ?? WHERE id=? LIMIT 1;',
      params: [TABLE_NAME, id]
    });
    return res;
  },

  async deleteByUsername (username: string) {
    const res = await db.createQuery({
      query: 'DELETE FROM ?? WHERE username=? LIMIT 1;',
      params: [TABLE_NAME, username]
    });
    return res;
  },

  async getById (id: number) {
    const list = await db.createQuery({
      query: 'SELECT * from ?? WHERE id=? LIMIT 1;',
      params: [TABLE_NAME, id],
    });
    return list.pop() ?? null;
  },

  async getByUsername (username: string) {
    const list = await db.createQuery({
      query: 'SELECT * from ?? WHERE username=? LIMIT 1;',
      params: [TABLE_NAME, username],
    });
    return list.pop() ?? null;
  },

  async getAll (): Promise<any[]> {
    const list = await db.createQuery({
      query: 'SELECT * from ??;',
      params: [TABLE_NAME],
    });
    return list;
  },
}
