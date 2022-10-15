import { coordinateData } from './coordinate-data'
export const convertData = function (data: any) {
  const res: any[] = []
  data.forEach((item: any) => {
    const geoCoord = coordinateData[item.name]
    if (geoCoord) {
      res.push({
        name: item.name,
        value: geoCoord.concat(item.value)
      })
    }
  })
  return res
}
