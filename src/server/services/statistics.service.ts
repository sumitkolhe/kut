import { LinkModel } from 'server/models/link.model'

export class StatisticsService {
  public statistics = async (alias: string) => {
    const stats = await LinkModel.aggregate([
      { $match: { alias } },
      {
        $lookup: {
          from: 'statistics',
          localField: 'statistics',
          foreignField: '_id',
          as: 'statistics',
        },
      },
      { $unwind: '$statistics' },
      {
        $group: {
          _id: null,
          windows: {
            $sum: { $cond: ['$statistics.os.windows', 1, 0] },
          },
          linux: {
            $sum: { $cond: ['$statistics.os.linux', 1, 0] },
          },
          mac: {
            $sum: { $cond: ['$statistics.os.mac', 1, 0] },
          },
          android: {
            $sum: { $cond: ['$statistics.os.android', 1, 0] },
          },
          opera: {
            $sum: { $cond: ['$statistics.browser.opera', 1, 0] },
          },
          ie: {
            $sum: { $cond: ['$statistics.browser.ie', 1, 0] },
          },
          edge: {
            $sum: { $cond: ['$statistics.browser.edge', 1, 0] },
          },
          safari: {
            $sum: {
              $cond: ['$statistics.browser.safari', 1, 0],
            },
          },
          firefox: {
            $sum: {
              $cond: ['$statistics.browser.firefox', 1, 0],
            },
          },
          chrome: {
            $sum: {
              $cond: ['$statistics.browser.chrome', 1, 0],
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

    const views = await LinkModel.aggregate([
      { $match: { alias } },
      {
        $lookup: {
          from: 'statistics',
          let: {
            statistics: '$statistics',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$statistics'],
                },
              },
            },
            {
              $group: {
                _id: {
                  $substr: ['$visitDate', 0, 35],
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

    if (stats.length > 0) {
      stats[0].statistics.views = views[0]?.visitData
      return stats[0]
    } else {
      return null
    }
  }

  public getVisitStats = async (alias: string) => {
    const views = await LinkModel.aggregate([
      { $match: { alias } },
      {
        $lookup: {
          from: 'statistics',
          let: {
            statistics: '$statistics',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$statistics'],
                },
              },
            },
            {
              $group: {
                _id: {
                  $substr: ['$visitDate', 0, 35],
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

    if (views.length > 0 && views[0].visitData) {
      return views[0]?.visitData
    }
    return null
  }
}
