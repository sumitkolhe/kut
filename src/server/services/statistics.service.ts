import { LinkModel } from 'server/models/link.model'

export class StatisticsService {
  public statistics = async (alias: string) => {
    const analytics = await LinkModel.aggregate([
      { $match: { alias } },
      {
        $lookup: {
          from: 'analytics',
          localField: 'analytics',
          foreignField: '_id',
          as: 'analytics',
        },
      },
      { $unwind: '$analytics' },
      {
        $group: {
          _id: null,
          // visitCount: { $first: '$visitCount' },
          // description: { $first: '$description' },
          // alias: { $first: '$alias' },
          // shortUrl: { $first: '$shortUrl' },
          // target: { $first: '$target' },
          // createdAt: { $first: '$createdAt' },

          windows: {
            $sum: { $cond: ['$analytics.os.windows', 1, 0] },
          },
          linux: {
            $sum: { $cond: ['$analytics.os.linux', 1, 0] },
          },
          mac: {
            $sum: { $cond: ['$analytics.os.mac', 1, 0] },
          },
          android: {
            $sum: { $cond: ['$analytics.os.android', 1, 0] },
          },
          opera: {
            $sum: { $cond: ['$analytics.browser.opera', 1, 0] },
          },
          ie: {
            $sum: { $cond: ['$analytics.browser.ie', 1, 0] },
          },
          edge: {
            $sum: { $cond: ['$analytics.browser.edge', 1, 0] },
          },
          safari: {
            $sum: {
              $cond: ['$analytics.browser.safari', 1, 0],
            },
          },
          firefox: {
            $sum: {
              $cond: ['$analytics.browser.firefox', 1, 0],
            },
          },
          chrome: {
            $sum: {
              $cond: ['$analytics.browser.chrome', 1, 0],
            },
          },
        },
      },
      {
        $addFields: {
          analytics: {
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
          from: 'analytics',
          let: {
            analytics: '$analytics',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$analytics'],
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

    if (analytics.length > 0) {
      analytics[0].analytics.views = views[0]?.visitData
      return analytics[0]
    } else {
      return null
    }
  }
}
