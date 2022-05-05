import express from 'express'

import { SubmitFeedbackService } from './services/submitFeedbackService';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const nodemailerMailAdapter = new NodemailerMailAdapter()
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter)

  submitFeedbackService.execute(req.body)

  return res.status(201).send()
})