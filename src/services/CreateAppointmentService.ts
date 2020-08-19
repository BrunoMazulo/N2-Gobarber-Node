import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/Appointment.Repository';
import AppError from '../errors/AppError';

interface RequestDTO{
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  // private appointmentsRepository: AppointmentsRepository;

  // constructor(appointmentRepository: AppointmentsRepository){
  //   this.appointmentsRepository = appointmentRepository;
  // }

  public async execute({ date, provider_id }: RequestDTO): Promise<Appointment>{

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    // O metodo create não salva no banco, apenas cria uma instancia, por isso temos o metodo save.
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;


