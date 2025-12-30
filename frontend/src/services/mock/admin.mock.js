export default function setupAdminMock(mock) {
  const vendors = [
    {
      id: 'v_1',
      name: 'FixIt Plumbing Co.',
      status: 'pending_verification',
      totalJobs: 12,
    },
    {
      id: 'v_2',
      name: 'BrightSpark Electricians',
      status: 'verified',
      totalJobs: 34,
    },
  ]

  // GET /admin/vendors
  mock.onGet('/admin/vendors').reply(200, {
    items: vendors,
  })

  // POST /admin/vendors/:id/verify
  mock.onPost(/\/admin\/vendors\/[^/]+\/verify$/).reply((config) => {
    const id = config.url.split('/')[3]
    const vendor = vendors.find((v) => v.id === id)

    if (!vendor) {
      return [404, { message: 'Vendor not found' }]
    }

    vendor.status = 'verified'

    return [200, { message: 'Vendor verified', vendor }]
  })

  // GET /admin/stats
  mock.onGet('/admin/stats').reply(200, {
    totalUsers: 128,
    totalVendors: vendors.length,
    openComplaints: 23,
    resolvedComplaints: 89,
  })
}
