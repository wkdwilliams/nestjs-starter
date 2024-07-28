interface DataObject {
  [key: string]: any;
}

interface JsonToCsvOptions {
  exclude?: string[];
  include?: string[];
  transpose?: boolean;
}

/**
 * Convert json object to csv
 * options.include supercedes
 * options.exclude
 * @param obj
 * @param options
 * @returns
 */
export default function JsonToCsv(
  obj: DataObject[] | DataObject,
  options?: JsonToCsvOptions,
): string {
  options = { include: [], exclude: [], ...options };

  if (!Array.isArray(obj)) obj = [obj];
  const columns =
    options.include.length !== 0
      ? Object.keys(obj[0]).filter((key) => options.include.includes(key))
      : Object.keys(obj[0]).filter((key) => !options.exclude.includes(key));

  if (options.transpose) {
    const data = [columns].concat(
      obj.map((item) => columns.map((column) => item[column] ? item[column].toString().replaceAll(',', '') : "")),
    );
    return transpose(data);
  } else {
    const header = columns.join(',') + '\n';
    const rows = obj.map((item) =>
      columns.map((column) => item[column]).join(','),
    );

    return header + rows.join('\n');
  }
}

function transpose(matrix: any[]): string {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]).join(',')).join('\n');
}


//\t tab delimiter 