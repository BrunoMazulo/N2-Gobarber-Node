// import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm'
import Appointment from '../models/appointment';

@EntityRepository(Appointment) // Declarando que a Entidade está localizada no model
class AppointmentsRepository extends Repository<Appointment>{

  public async findByDate(date: Date): Promise<Appointment | null>{
    // const findAppointment = thi s.appointments.find(appointment =>
    //  isEqual(date, appointment.date));

    const findAppointment = await this.findOne({
      where: { date },
    });

    // Se tiver o findAppointment retorna esse objeto, senão retorna nulo.
    return findAppointment || null;
  }

}

export default AppointmentsRepository;
