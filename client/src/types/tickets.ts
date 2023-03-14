export type TicketBody = {
  title: string;
  description: string;
  priority: string;
  assigneeId: string;
};

export type TicketUser = {
  name: string;
  email: string;
  id: string;
};

export enum PriorityValues {
  high = "high",
  low = "low",
  medium = "medium",
}

export enum StatusValues {
  open = "open",
  closed = "closed",
}

export type Status = keyof typeof StatusValues;
export type Priority = keyof typeof PriorityValues;

export type FetchedTicket = {
  id: string;
  assigneeId: string;
  assignorId: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
  assignee: TicketUser;
  assignor: TicketUser;
};

export type FetchTicketsResponse = {
  count: number;
  tickets: [FetchedTicket];
};

export type FetchedTicketResponse = {
  ticket: FetchedTicket;
};

export type FilterType = {
  priority?: Priority[];
  status?: Status[];
  search?: string;
};

export type FilterQuery = {
  order: "DATE_ASC" | "DATE_DESC";
  filter: FilterType;
};
