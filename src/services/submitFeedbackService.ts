import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbacksRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackServiceRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackService {
  
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request

    if(!type) {
      throw new Error('type is required.')
    }

    if(!comment) {
      throw new Error('comment is required.')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type, comment, screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Feedback cadastrado com sucesso',
      body: [
        '<div style="color: #333; font-size: 18px">',
        `<p><strong>Tipo do feedback:</strong> ${type}</p>`,
        `<p><strong>Comentário:</strong> ${comment}</p>`,
        screenshot ? `<img width="900px" src="${screenshot}" />` : '',
        '</div>',
      ].join('\n')
    })
  }
}