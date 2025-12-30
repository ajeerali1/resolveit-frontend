export default function setupCustomerMock(mock) {
  // In-memory dummy complaints list
  const complaints = [
    {
      id: 'cmp_1',
      title: 'Leaky faucet in kitchen',
      status: 'open',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'cmp_2',
      title: 'Power outage in living room',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
    },
  ]

  // GET /customer/complaints
  mock.onGet('/customer/complaints').reply(200, {
    items: complaints,
  })

  // POST /customer/complaints
  mock.onPost('/customer/complaints').reply((config) => {
    const body = JSON.parse(config.data || '{}')
    const newComplaint = {
      id: `cmp_${complaints.length + 1}`,
      title: body.title || 'New complaint',
      description: body.description || '',
      status: 'open',
      createdAt: new Date().toISOString(),
    }
    complaints.push(newComplaint)

    return [201, newComplaint]
  })

  // GET /customer/complaints/:id
  mock.onGet(/\/customer\/complaints\/[^/]+$/).reply((config) => {
    const id = config.url.split('/').pop()
    const complaint = complaints.find((c) => c.id === id)

    if (!complaint) {
      return [404, { message: 'Complaint not found' }]
    }

    return [200, complaint]
  })
}
