import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  LanguageResolvers,
} from 'types/graphql'

export const languages: QueryResolvers['languages'] = () => {
  return db.language.findMany()
}

export const language: QueryResolvers['language'] = ({ id }) => {
  return db.language.findUnique({
    where: { id },
  })
}

export const createLanguage: MutationResolvers['createLanguage'] = ({
  input,
}) => {
  return db.language.create({
    data: input,
  })
}

export const updateLanguage: MutationResolvers['updateLanguage'] = ({
  id,
  input,
}) => {
  return db.language.update({
    data: input,
    where: { id },
  })
}

export const deleteLanguage: MutationResolvers['deleteLanguage'] = ({ id }) => {
  return db.language.delete({
    where: { id },
  })
}

export const Language: LanguageResolvers = {
  snippets: (_obj, { root }) =>
    db.language.findUnique({ where: { id: root.id } }).snippets(),
}
