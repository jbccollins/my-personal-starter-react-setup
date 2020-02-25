import { executeQuery } from '../common';

const all = async () => {
  const sql = `SELECT * FROM "Users"`;
	const queryResults = await executeQuery(sql);
	return queryResults;
};

export {
  all,
};