import { stringify } from "csv-stringify";

export const generateCsv = async <T>(records: T[]): Promise<string | null> => {
  if (!records || records.length === 0) {
    console.log("No data provided for CSV generation.");
    return null;
  }

  const firstRow = records[0] as object;
  const headers = Object.keys(firstRow).map((key: string) => ({ key, header: key }));

  return new Promise((resolve, reject) => {
    stringify(records, { header: true, columns: headers }, (err, output) => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });
};
