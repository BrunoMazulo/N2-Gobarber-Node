import { Router, request, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/Appointment.Repository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// const appointmentsRepository = new AppointmentsRepository(); // Instancia a classe AppointmentsRepository


// Aplica o middleware ensureAuthenticated a todas as rotas de appointments
appointmentsRouter.use(ensureAuthenticated);
// Poderiamos aplicar o middleware a rotas especificas, como no formato abaixo:
// appointmentsRouter.get('/', ensureAuthenticated, async (request, response) => {...

appointmentsRouter.get('/', async (request, response) => {

  // Chama o repositorio e atribui a constante appointmentsRepository
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});


appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return response.json(appointment);

});

export default appointmentsRouter;
