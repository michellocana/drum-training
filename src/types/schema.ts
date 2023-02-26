import * as Yup from 'yup'

export const MomentSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  start: Yup.number().required('Required field').lessThan(Yup.ref('end')),
  end: Yup.number().required('Required field').moreThan(Yup.ref('start')),
})
