export interface Company {
  _id: Id;
  name: string;
  address: string;
  description: string;
  logo: string;
  createdBy: CreatedBy;
  isDeleted: boolean;
  deletedAt: any;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  __v: number;
  scale: string;
}

export interface Id {
  $oid: string;
}

export interface CreatedBy {
  _id: string;
  email: string;
}

export interface CreatedAt {
  $date: string;
}

export interface UpdatedAt {
  $date: string;
}
