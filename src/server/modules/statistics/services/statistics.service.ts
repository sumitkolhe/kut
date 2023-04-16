import dayjs from 'dayjs'
import { Types } from 'mongoose'
import { LinkModel } from 'server/modules/links/models/link.model'
import { StatisticsModel } from 'server/modules/statistics/models/statistics.model'
import type { StatisticsPeriod } from 'interfaces/statistics.interface'

export class StatisticsService {
  public getOverviewStats = async (userId: string) => {
    // const currentDate = dayjs().toDate()

    const overview = await LinkModel.aggregate([
      { $match: { userId: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalLinks: {
            $sum: { $cond: ['$_id', 1, 0] },
          },
          disabledLinks: {
            $sum: { $cond: ['$meta.active', 0, 1] },
          },
          // expiredLinks: {
          //   $sum: {
          //     $cond: [{ $and: [{ '$meta.password': { $lte: currentDate } }] }, 1, 0],
          //   },
          // },
          totalVisits: {
            $sum: '$visitCount',
          },
          protectedLinks: {
            $sum: { $cond: ['$meta.password', 1, 0] },
          },
        },
      },
      { $project: { _id: 0 } },
    ])

    if (overview.length > 0) {
      return overview[0]
    } else {
      return null
    }
  }

  public getDeviceStats = async (userId: string, alias: string, period: StatisticsPeriod) => {
    const link = await LinkModel.findOne({ userId, alias })

    const currentDate = dayjs().toDate()
    let pastDate = dayjs().toDate()

    if (period === '1h') {
      pastDate = dayjs().subtract(1, 'h').toDate()
    } else if (period === '24h') {
      pastDate = dayjs().subtract(24, 'h').toDate()
    } else if (period === '7d') {
      pastDate = dayjs().subtract(7, 'd').toDate()
    } else if (period === '30d') {
      pastDate = dayjs().subtract(30, 'd').toDate()
    } else if (period === '180d') {
      pastDate = dayjs().subtract(180, 'd').toDate()
    } else if (period === 'all') {
      pastDate = dayjs().subtract(10, 'y').toDate()
    }

    const stats = await StatisticsModel.aggregate([
      { $match: { linkId: new Types.ObjectId(link?.id) } },
      {
        $match: {
          $and: [{ visitDate: { $lte: currentDate } }, { visitDate: { $gte: pastDate } }],
        },
      },
      {
        $group: {
          _id: null,
          windows: {
            $sum: { $cond: ['$os.windows', 1, 0] },
          },
          linux: {
            $sum: { $cond: ['$os.linux', 1, 0] },
          },
          mac: {
            $sum: { $cond: ['$os.mac', 1, 0] },
          },
          android: {
            $sum: { $cond: ['$os.android', 1, 0] },
          },
          opera: {
            $sum: { $cond: ['$browser.opera', 1, 0] },
          },
          ie: {
            $sum: { $cond: ['$browser.ie', 1, 0] },
          },
          edge: {
            $sum: { $cond: ['$browser.edge', 1, 0] },
          },
          safari: {
            $sum: {
              $cond: ['$browser.safari', 1, 0],
            },
          },
          firefox: {
            $sum: {
              $cond: ['$browser.firefox', 1, 0],
            },
          },
          chrome: {
            $sum: {
              $cond: ['$browser.chrome', 1, 0],
            },
          },
        },
      },
      {
        $addFields: {
          statistics: {
            os: {
              windows: '$windows',
              linux: '$linux',
              mac: '$mac',
              android: '$android',
            },
            browser: {
              opera: '$opera',
              ie: '$ie',
              edge: '$edge',
              safari: '$safari',
              firefox: '$firefox',
              chrome: '$chrome',
            },
          },
          _id: '$$REMOVE',
          windows: '$$REMOVE',
          linux: '$$REMOVE',
          mac: '$$REMOVE',
          android: '$$REMOVE',
          opera: '$$REMOVE',
          ie: '$$REMOVE',
          edge: '$$REMOVE',
          safari: '$$REMOVE',
          firefox: '$$REMOVE',
          chrome: '$$REMOVE',
        },
      },
    ])

    if (stats.length > 0) {
      return stats.map((link) => link.statistics)[0]
    } else {
      return null
    }
  }

  public getVisitStats = async (userId: string, alias: string, period: StatisticsPeriod) => {
    const currentDate = dayjs().toDate()
    let pastDate = dayjs().toDate()
    let dateSplit = 35

    if (period === '1h') {
      pastDate = dayjs().subtract(1, 'h').toDate()
      dateSplit = 16
    } else if (period === '24h') {
      pastDate = dayjs().subtract(24, 'h').toDate()
      dateSplit = 13
    } else if (period === '7d') {
      pastDate = dayjs().subtract(7, 'd').toDate()
      dateSplit = 10
    } else if (period === '30d') {
      pastDate = dayjs().subtract(30, 'd').toDate()
      dateSplit = 10
    } else if (period === '180d') {
      pastDate = dayjs().subtract(180, 'd').toDate()
      dateSplit = 10
    } else if (period === 'all') {
      pastDate = dayjs().subtract(10, 'y').toDate()
      dateSplit = 10
    }

    const views = await LinkModel.aggregate([
      {
        $match: { alias, userId: new Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'statistics',
          let: {
            statistics: '$statistics',
          },
          pipeline: [
            {
              $match: {
                $and: [{ visitDate: { $lte: currentDate } }, { visitDate: { $gte: pastDate } }],
              },
            },
            {
              $group: {
                _id: {
                  $substr: ['$visitDate', 0, dateSplit],
                },
                v: {
                  $sum: 1,
                },
              },
            },
            {
              $project: {
                _id: 0,
                k: '$_id',
                v: 1,
              },
            },
          ],
          as: 'visitData',
        },
      },
      {
        $addFields: {
          visitData: {
            $arrayToObject: '$visitData',
          },
        },
      },
    ])

    if (views.length > 0 && views[0].visitData && Object.keys(views[0].visitData).length > 0) {
      return views[0]?.visitData
    }
    return null
  }
}
