const moment = require('moment');

class Model {
    /**
     * 
	 * 查询列表
     * @param {Number} offset - 分页-偏移量
     * @param {Number} limit  - 分页-数量
     * @param {Object} filter - 过滤sql
     * @param {String} where  - 条件sql
     * @param {String} order  - 排序sql
     * 
     */
    static async findAll({ offset, limit, filter, like, where, order, includeDeleted }) {
        offset = offset == undefined ? 0 : offset;
        limit = limit == undefined ? 100000 : limit;
        let filter_sql = Object.keys(filter || {}).map((key, index) => {
            if (!filter[key] && filter[key] !== 0) return ""; 
            return ` AND ${key}="${filter[key]}"`;
        }).join("");
        Object.keys(like || {}).forEach((key,index)=>{
            if (!like[key] && like[key] !== 0) return ""; 
            filter_sql +=  ` AND ${key} LIKE '%${like[key]}%'`;
        });

        let where_sql = where ? ` AND ${where}` : '';
        let order_sql = order || 'create_time DESC';
        
        let listQuery = includeDeleted ? 'SELECT * FROM ??' : `SELECT * FROM ?? WHERE deleted=0 ${filter_sql} ${where_sql} ORDER BY ${order_sql} LIMIT ?, ?`,
            listParams = includeDeleted ? [this.TABLE_NAME] : [this.TABLE_NAME, offset, limit];
        let list = await this.db.createQuery({
            query: listQuery, 
            params: listParams
        });
        
        let total = (await this.db.createQuery({
            query: `SELECT COUNT(*) AS TOTAL FROM ?? WHERE deleted=0 ${filter_sql} ${where_sql}`,
            params: [this.TABLE_NAME]
        })).shift();

        list.forEach((item) => {
            item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.update_time = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
        });
        return { total: total.TOTAL, list }
    }
    /**
     * 
	 * 查询 ID
     * @param {Number} id - 单个id
     * 
     */
    static async findById(id){
        let list = await this.db.createQuery({
            query: `SELECT * FROM ?? WHERE id=? AND deleted=0 LIMIT 1;`,
            params: [this.TABLE_NAME, id]
        });
        list.forEach((item) => {
            item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.update_time = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
        });
        return list.shift();
    }
    /**
     * 
	 * 查询 ID列表
     * @param {Array} ids - id数组
     * 
     */
    static async findByIds(ids) {
        console.log("TCL: findByIds -> ids", ids)
        let idsStr = `(${ids.join(',')})`;
        let list = await this.db.createQuery({
            query: `SELECT * FROM ?? WHERE deleted=0 AND id in ${idsStr} ORDER BY create_time DESC`, 
            params: [this.TABLE_NAME]
        });
        list = list.map((item) => {
            item.create_time = moment(item.create_time).format('YYYY-MM-DD HH:mm:ss');
            item.update_time = moment(item.update_time).format('YYYY-MM-DD HH:mm:ss');
            return item;
        });
        return list
    }
    /**
     * 
	 * 新增
     * @param {Object} input - 新增数据
     * 
     */
    static async create({ input }) {
        const connection = await this.db.getConnectionFromPool();
        try {
			let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
            let data = Object.assign(input, {
                create_time: currentTime,
                update_time: currentTime,
                data_version: 0,
                deleted: 0
            })
            let _result = await this.db.connectionQuery({
                query: `INSERT INTO ??
                        SET ?;`,
                params: [this.TABLE_NAME, data],
                connection
            })
            return await this.findById(_result.insertId)
        } finally {
            if (connection != null) connection.release()
        }
    }
    /**
     * 
	 * 修改
     * @param {Number} id - id
     * @param {Object} input - 修改数据
     * 
     */
    static async update({ id, input }) {
        const connection = await this.db.getConnectionFromPool();
        try {
			let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
            let data = Object.assign(input, {
                update_time: currentTime
            })
            let _result = await this.db.connectionQuery({
                query: `UPDATE ??
                        SET ?,
                        data_version=data_version+1
                        WHERE id=? AND deleted=0;`,
                params: [this.TABLE_NAME, data, id],
                connection
            })
            return await this.findById(id);
        } finally {
            if (connection != null) connection.release()
        }
    }
    /**
     * 
	 * 删除
     * @param {Number} id - id
     * 
     */
    static async delete(id) {
        const connection = await this.db.getConnectionFromPool();
        try {
            let currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
            let data = {
                update_time: currentTime
            }
            let _result = await this.db.connectionQuery({
                query: `UPDATE ??
                        SET ?,
                        deleted=1
                        WHERE id=? AND deleted=0;`,
                params: [this.TABLE_NAME, data, id],
                connection
            })
            return await id;
        } finally {
            if (connection != null) connection.release()
        }
    }
}

module.exports = Model;
