import { SubmitFeedbackService } from "./submitFeedbackService"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
)

describe('submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'test 123',
      screenshot: 'data:image/png;base64asdhgasgdjhasgdjh'
    })).resolves.not.toThrow()

    expect(createFeedbackSpy).toBeCalled()
    expect(sendMailSpy).toBeCalled()
  })

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'test 123',
      screenshot: 'data:image/png;base64asdhgasgdjhasgdjh'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64asdhgasgdjhasgdjh'
    })).rejects.toThrow()
  })

  it('should not be able to submit feedback without screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'test12',
      screenshot: 'aaaa'
    })).rejects.toThrow()
  })
})