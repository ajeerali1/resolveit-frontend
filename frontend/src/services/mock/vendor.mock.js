export default function setupVendorMock(mock) {
  const jobs = [
    {
      id: 'job_1',
      title: 'Fix leaky faucet',
      status: 'pending',
      customerName: 'John Doe',
    },
    {
      id: 'job_2',
      title: 'Restore power in living room',
      status: 'assigned',
      customerName: 'Jane Smith',
    },
  ]

  // GET /vendor/jobs
  mock.onGet('/vendor/jobs').reply(200, {
    items: jobs,
  })

  // POST /vendor/jobs/:id/accept
  mock.onPost(/\/vendor\/jobs\/[^/]+\/accept$/).reply((config) => {
    const id = config.url.split('/')[3]
    const job = jobs.find((j) => j.id === id)

    if (!job) {
      return [404, { message: 'Job not found' }]
    }

    job.status = 'accepted'

    return [200, { message: 'Job accepted', job }]
  })

  // POST /vendor/jobs/:id/proof
  mock.onPost(/\/vendor\/jobs\/[^/]+\/proof$/).reply((config) => {
    const id = config.url.split('/')[3]
    const job = jobs.find((j) => j.id === id)

    if (!job) {
      return [404, { message: 'Job not found' }]
    }

    job.status = 'completed'

    return [
      200,
      {
        message: 'Proof of work submitted',
        job,
      },
    ]
  })
}
