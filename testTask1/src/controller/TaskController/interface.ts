export interface ITaskCreate {
  name: string
  dateInit: Date
  dateEnd?: Date
}

export interface ITaskUpdate {
  name?: string
  dateInit?: Date
  dateEnd?: Date
}
