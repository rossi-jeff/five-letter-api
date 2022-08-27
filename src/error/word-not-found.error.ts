import { NotFoundException } from '@nestjs/common';

export const WordNotFound = (Word: string) => {
  return new NotFoundException(`Word '${Word}' was not in the list`);
};
