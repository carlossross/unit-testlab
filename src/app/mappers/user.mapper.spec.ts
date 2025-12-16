import { mapUserDtoToUser, UserDto } from './user.mapper';

describe('mapUserDtoToUser', () => {
  it('mapea id, construye fullName y convierte email null a string vacío', () => {
    // Arrange
    const dto: UserDto = {
      id: 7,
      first_name: 'Carlos',
      last_name: 'De la Rosa',
      email: null,
    };

    // Act
    const user = mapUserDtoToUser(dto);

    // Assert
    expect(user).toEqual({
      id: 7,
      fullName: 'Carlos De la Rosa',
      email: '',
    });
  });
});
