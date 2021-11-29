import { formatDate } from './dateHelper'

test('When call formatDate should be returned formated date', () => {
    const formatedDate = formatDate(new Date('Sun Nov 28 2021 23:47:40 GMT-0300'))
    expect(formatedDate).toBe('28 Nov 2021')
})
