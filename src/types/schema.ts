import * as Yup from 'yup'

export const TrackSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  artist: Yup.string().required('Required field'),
  videoUrl: Yup.string()
    .url('Invalid Video URL')
    .required('Required field')
    .test({
      name: 'isYoutubeVideoUrl',
      test(value, ctx) {
        if (!/youtube\.com\/watch\?v=[a-z0-9]*/.test(value)) {
          return ctx.createError({ message: 'xlaksalks' })
        }

        return true
      },
    }),
})

export const MomentSchema = Yup.object().shape({
  name: Yup.string().required('Required field'),
  start: Yup.number().required('Required field').lessThan(Yup.ref('end')),
  end: Yup.number().required('Required field').moreThan(Yup.ref('start')),
})
