import { executeQuery } from '../common';

const all = async () => {
  const sql = `SELECT * FROM user_data`;
	const queryResults = await executeQuery(sql);
	return queryResults;
};

export {
  all,
};