import { orderService } from '../services/order.service.local.js'
import { httpService } from '../services/http.service.js'

jest.mock('../services/http.service.js')

const mockOrder = {
    _id: '1111252525',
    name: 'ofek',
    at: '15.02.2023'
}

const mockCred = {
    _id: '1111252525',
    name: 'ofek',
    at: '15.02.2023'
}

describe('orderService', () => {

    beforeEach(() => {
        httpService.post.mockReset()
    })

    it('should Add order successfully', async () => {
        expect.assertions(2)

        const httpResp = mockOrder
        httpService.post.mockResolvedValue(httpResp)
        const res = await orderService.add(mockCred)
        expect(res).toBeCalled(mockOrder)
        expect(httpService.post).toBeCalled()
    })

})