const { expect } = require('chai'),
  {
    getPagesIds,
    filterEntriesByFieldAndKey,
    groupEntriesByPage
  } = require('../../lib/utils/groupingHelper');

describe('getPagesIds method', function () {
  it('should return a key for a single page', function () {
    const pages = [
        {
          startedDateTime: '2021-10-18T22:06:46.295Z',
          id: 'page_12',
          title: 'http://localhost:3000/projects',
          pageTimings: {
            onContentLoad: 1208.8670000084676,
            onLoad: 1268.7880000448786
          }
        }
      ],
      result = getPagesIds(pages);
    expect(result).to.not.be.undefined;
    expect(result.length).to.eq(1);
    expect(result[0]).to.eq('page_12');
  });

  it('should return 3 keys for a 3 pages', function () {
    const pages = [
        {
          startedDateTime: '2021-10-18T22:06:46.295Z',
          id: 'page_12',
          title: 'http://localhost:3000/projects',
          pageTimings: {
            onContentLoad: 1208.8670000084676,
            onLoad: 1268.7880000448786
          }
        },
        {
          startedDateTime: '2021-10-18T22:06:46.295Z',
          id: 'page_1',
          title: 'http://localhost:3000/projects',
          pageTimings: {
            onContentLoad: 1208.8670000084676,
            onLoad: 1268.7880000448786
          }
        },
        {
          startedDateTime: '2021-10-18T22:06:46.295Z',
          id: 'page_2',
          title: 'http://localhost:3000/projects',
          pageTimings: {
            onContentLoad: 1208.8670000084676,
            onLoad: 1268.7880000448786
          }
        }
      ],
      result = getPagesIds(pages);
    expect(result).to.not.be.undefined;
    expect(result.length).to.eq(3);
    expect(result[0]).to.eq('page_12');
    expect(result[1]).to.eq('page_1');
    expect(result[2]).to.eq('page_2');
  });

  it('should return 0 keys for an empty array', function () {
    const result = getPagesIds([]);
    expect(result).to.not.be.undefined;
    expect(result.length).to.eq(0);
  });

  it('should return 0 keys for undefined', function () {
    const result = getPagesIds();
    expect(result).to.not.be.undefined;
    expect(result.length).to.eq(0);
  });

});

describe('filterEntriesByFieldAndKey method', function () {
  it('should return one entries that correspond', function () {
    const entries = [
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_1'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_1'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_2'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_3'
        }
      ],
      result = filterEntriesByFieldAndKey(entries, 'pageref', 'page_3');
    expect(result.length).to.equal(1);
  });

  it('should return 2 entries that correspond', function () {
    const entries = [
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_1'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_1'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_2'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_3'
        }
      ],
      result = filterEntriesByFieldAndKey(entries, 'pageref', 'page_1');
    expect(result.length).to.equal(2);
  });
});

describe('groupEntriesByPage method', function () {
  it('should return 3 groups for 3 pages and different entries', function () {
    const pages = [
      {
        startedDateTime: '2021-10-18T22:06:46.295Z',
        id: 'page_1',
        title: 'http://localhost:3000/projects',
        pageTimings: {
          onContentLoad: 1208.8670000084676,
          onLoad: 1268.7880000448786
        }
      },
      {
        startedDateTime: '2021-10-18T22:06:46.295Z',
        id: 'page_2',
        title: 'http://localhost:3000/projects',
        pageTimings: {
          onContentLoad: 1208.8670000084676,
          onLoad: 1268.7880000448786
        }
      },
      {
        startedDateTime: '2021-10-18T22:06:46.295Z',
        id: 'page_3',
        title: 'http://localhost:3000/projects',
        pageTimings: {
          onContentLoad: 1208.8670000084676,
          onLoad: 1268.7880000448786
        }
      }
      ],
      entries = [
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_1'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_1'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_2'
        },
        {
          _priority: 'High',
          _resourceType: 'fetch',
          cache: {},
          connection: '166037',
          pageref: 'page_3'
        }
      ],
      result = groupEntriesByPage(entries, pages);
    expect(result).to.not.be.undefined;
    expect(result.length).to.equal(3);
    expect(result[0].entries.length).to.equal(2);
    expect(result[1].entries.length).to.equal(1);
    expect(result[2].entries.length).to.equal(1);
  });
});

