import Appointment from '../infra/typeorm/entities/Appointments';
import ICreateAppointmenteDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmenteDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
