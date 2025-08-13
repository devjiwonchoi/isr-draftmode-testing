import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setDraftMode({ enable: false })
  res.redirect('/?token=foo')
}
