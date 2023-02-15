import { httpService } from '../services/http.service.js'
import { userService } from '../services/user.service'

jest.mock('../services/http.service.js')

const mockUser = {
  fullname: "guy peer",
  imgUrl: "https://i.postimg.cc/gJ8DDKxF/peer.png",
  isOwner: false,
  wishList: [],
  _id: "63cfe9f88276fe4e2c861da6"
}

const mockCred = { username: mockUser.username, password: 'sk' }

describe('UserService', () => {

  beforeEach(() => {
    httpService.post.mockReset()
  })
  it('should login successfully', async () => {
    expect.assertions(2)

    const httpResp = mockUser
    httpService.post.mockResolvedValue(httpResp)
    const res = await userService.login(mockCred)
    expect(res).toStrictEqual(mockUser)
    expect(httpService.post).toBeCalled()
  })

})