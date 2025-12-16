export type UserDto = {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
};

export function mapUserDtoToUser(dto: UserDto): User {
  return {
    id: dto.id,
    fullName: `${dto.first_name} ${dto.last_name}`.trim(),
    email: dto.email ?? '',
  };
}
