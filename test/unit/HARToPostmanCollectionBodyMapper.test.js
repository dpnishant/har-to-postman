const { expect } = require('chai'),
  {
    mapBodyFromJson,
    mapBody,
    mapBodyFromJsonResponse,
    mapBodyResponse
  } = require('../../lib/HARToPostmanCollectionBodyMapper'),
  getOptions = require('./../../lib/utils/options').getOptions;


describe('HARToPostmanCollectionBodyMapper mapBodyFromJson', function () {

  it('Should get body with raw and json type', function () {
    const harRequest = { postData: { text: '{"some":"value"}' } },
      result = mapBodyFromJson(harRequest);
    expect(result).to.not.be.undefined;
    expect(result.mode).to.equal('raw');
    expect(result.options.raw.language).to.equal('json');
    expect(result.raw).to.equal('{\n "some": "value"\n}');
  });

  it('Should get empty body when no post data is present', function () {
    const harRequest = {},
      result = mapBodyFromJson(harRequest);
    expect(result).to.not.be.undefined;
    expect(result.mode).to.equal('raw');
    expect(result.options.raw.language).to.equal('json');
    expect(result.raw).to.equal('');
  });

  it('Should get empty body when no har request is present', function () {
    const result = mapBodyFromJson();
    expect(result).to.not.be.undefined;
    expect(result.mode).to.equal('raw');
    expect(result.options.raw.language).to.equal('json');
    expect(result.raw).to.equal('');
  });

  it('should get json string with indentation as "\t"', function () {
    const options = getOptions({ usage: ['CONVERSION'] }),
      indentCharacter = options.find((option) => { return option.id === 'indentCharacter'; }),
      harRequest = { postData: { text: '{"some":"value"}' } },
      expectedOutput = '{\n\t"some": "value"\n}';
    let result,
      processOptions = {};
    processOptions[`${indentCharacter.id}`] = 'Tab';
    result = mapBodyFromJson(harRequest, processOptions);
    expect(result.raw).to.be.an('string');
    expect(result.raw).to.equal(expectedOutput);
  });

  it('should get json string with indentation as spaces', function () {
    const options = getOptions({ usage: ['CONVERSION'] }),
      indentCharacter = options.find((option) => { return option.id === 'indentCharacter'; }),
      harRequest = { postData: { text: '{"some":"value"}' } },
      expectedOutput = '{\n\   "some": "value"\n}';
    let result,
      processOptions = {};
    processOptions[`${indentCharacter.id}`] = '   ';
    result = mapBodyFromJson(harRequest, processOptions);
    expect(result.raw).to.be.an('string');
    expect(result.raw).to.equal(expectedOutput);
  });

});

describe('HARToPostmanCollectionBodyMapper mapBody', function () {

  it('Should get body with raw and json type', function () {
    const harRequest = { bodySize: 25, postData: { text: '{"some":"value"}', mimeType: 'application/json' } },
      result = mapBody(harRequest);
    expect(result).to.not.be.undefined;
    expect(result.mode).to.equal('raw');
    expect(result.options.raw.language).to.equal('json');
    expect(result.raw).to.equal('{\n\ "some": "value"\n}');
  });

  it('Should get body with raw and xml type', function () {
    const harRequest = { bodySize: 25, postData: { text: '<xml>test content</xml>', mimeType: 'application/xml' } },
      result = mapBody(harRequest);
    expect(result).to.not.be.undefined;
    expect(result.mode).to.equal('raw');
    expect(result.options.raw.language).to.equal('xml');
    expect(result.raw).to.equal('<xml>test content</xml>');
  });

  it('Should get undefined when body size is 0', function () {
    const harRequest = { bodySize: 0, postData: { text: '{"some":"value"}', mimeType: 'application/json' } },
      result = mapBody(harRequest);
    expect(result).to.be.undefined;
  });

  it('Should get undefined when mime type is not json', function () {
    const harRequest = { bodySize: 24, postData: { text: '{"some":"value"}', mimeType: 'application/pdf' } },
      result = mapBody(harRequest);
    expect(result).to.be.undefined;
  });

});


describe('HARToPostmanCollectionBodyMapper mapBodyFromJsonResponse', function () {

  it('Should get body with raw and json type', function () {
    const harResponse = { content: { text: '{"some":"value"}' } },
      result = mapBodyFromJsonResponse(harResponse);
    expect(result).to.not.be.undefined;
    expect(result.language).to.equal('json');
    expect(result.body).to.equal('{\n "some": "value"\n}');
  });

  it('Should get empty body when no post data is present', function () {
    const harResponse = {},
      result = mapBodyFromJsonResponse(harResponse);
    expect(result).to.not.be.undefined;
    expect(result.language).to.equal('json');
    expect(result.body).to.equal('');
  });

  it('Should get empty body when no har request is present', function () {
    const result = mapBodyFromJsonResponse();
    expect(result).to.not.be.undefined;
    expect(result.language).to.equal('json');
    expect(result.body).to.equal('');
  });

  it('should get json string with indentation as "\t"', function () {
    const options = getOptions({ usage: ['CONVERSION'] }),
      indentCharacter = options.find((option) => { return option.id === 'indentCharacter'; }),
      harResponse = { content: { text: '{"some":"value"}' } },
      expectedOutput = '{\n\t"some": "value"\n}';
    let result,
      processOptions = {};
    processOptions[`${indentCharacter.id}`] = 'Tab';
    result = mapBodyFromJsonResponse(harResponse, processOptions);
    expect(result.body).to.be.an('string');
    expect(result.body).to.equal(expectedOutput);
  });

  it('should get json string with indentation as spaces', function () {
    const options = getOptions({ usage: ['CONVERSION'] }),
      indentCharacter = options.find((option) => { return option.id === 'indentCharacter'; }),
      harResponse = { content: { text: '{"some":"value"}' } },
      expectedOutput = '{\n\   "some": "value"\n}';
    let result,
      processOptions = {};
    processOptions[`${indentCharacter.id}`] = '   ';
    result = mapBodyFromJsonResponse(harResponse, processOptions);
    expect(result.body).to.be.an('string');
    expect(result.body).to.equal(expectedOutput);
  });

});


describe('HARToPostmanCollectionBodyMapper mapBodyResponse', function () {

  it('Should get body with raw and json type', function () {
    const harResponse = { bodySize: -1, content: { text: '{"some":"value"}', mimeType: 'application/json', size: 25 } },
      result = mapBodyResponse(harResponse);
    expect(result).to.not.be.undefined;
    expect(result.language).to.equal('json');
    expect(result.body).to.equal('{\n "some": "value"\n}');
  });

  it('Should get undefined when body size is 0', function () {
    const harResponse = { bodySize: 0, content: { text: '{some:value}', mimeType: 'application/json' } },
      result = mapBodyResponse(harResponse);
    expect(result).to.be.undefined;
  });

  it('Should get not supported message when mime type is not text-based', function () {
    const harResponse = { bodySize: -1, content: { text: '{"some":"value"}', mimeType: 'application/pdf', size: 25 } },
      result = mapBodyResponse(harResponse),
      notSupportedMessage = 'This content type is not supported in the response body';
    expect(result.body).to.be.equal(notSupportedMessage);
  });

  it('Should be handled when mime type is application/javascript', function () {
    const harResponse = { bodySize: -1, content: { text: '{"some":"value"}',
        mimeType: 'application/javascript', size: 25 } },
      result = mapBodyResponse(harResponse);
    expect(result.body).to.be.equal('{"some":"value"}');
    expect(result.language).to.be.equal('text');
  });

  it('Should be handled when mime type is text/html', function () {
    const harResponse = {
        bodySize: -1,
        content: {
          text: '<html><body>Test content</body></html>',
          mimeType: 'text/html',
          size: 25
        }
      },
      result = mapBodyResponse(harResponse);
    expect(result.body).to.be.equal('<html><body>Test content</body></html>');
    expect(result.language).to.be.equal('html');
  });

  it('Should be handled when mime type is application/xml', function () {
    const harResponse = { bodySize: -1, content: { text: '<xml>test content</xml>',
        mimeType: 'application/xml', size: 25 } },
      result = mapBodyResponse(harResponse);
    expect(result.body).to.be.equal('<xml>test content</xml>');
    expect(result.language).to.be.equal('xml');
  });

  it('Should be handled when mime type is text/css', function () {
    const harResponse = { bodySize: -1, content: { text: 'test: {color: red}',
        mimeType: 'text/css', size: 25 } },
      result = mapBodyResponse(harResponse);
    expect(result.body).to.be.equal('test: {color: red}');
    expect(result.language).to.be.equal('text');
  });

});
