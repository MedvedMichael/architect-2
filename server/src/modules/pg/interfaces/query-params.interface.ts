interface RequestParams {
  tableName: string;
}

export interface WhereStatement {
  key: string;
  value: unknown;
  comparator?: string;
};


export interface SelectParams extends RequestParams {
  query?: string[];
  where?: WhereStatement[];
  orderBy?: string[];
}
export interface InsertParams<T> extends RequestParams {
  values: T[];
  returning?: string;
}

export interface DeleteParams extends RequestParams {
  where: WhereStatement[];
  returning?: string;
  cascade?: boolean;
}

export interface UpdateParams<UpdateType> extends RequestParams {
  where: WhereStatement[];
  updates: UpdateType & Record<string, unknown>;
  returning?: string;
}
