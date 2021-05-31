import pageValidData from './pageValidData.json';
import pageLongData from './pageLongData.json';
import pageNaughtyData from './pageNaughtyData.json';
import postValidData from './postValidData.json';
import postLongData from './postLongData.json';
import postNaughtyData from './postNaughtyData.json';

import faker from 'faker';

class AprioriPool {
  getPageLongData() {
    const index = faker.datatype.number(pageLongData.length - 1);

    return pageLongData[index];
  }
    
  getPageNaughtyData() {
    const index = faker.datatype.number(pageNaughtyData.length - 1);

    return pageNaughtyData[index];
  }

  getPageValidData() {
    const index = faker.datatype.number(pageValidData.length - 1);

    return pageValidData[index];
  }

  getPostLongData() {
    const index = faker.datatype.number(postLongData.length - 1);

    return postLongData[index];
  }
    
  getPostNaughtyData() {
    const index = faker.datatype.number(postNaughtyData.length - 1);

    return postNaughtyData[index];
  }

  getPostValidData() {
    const index = faker.datatype.number(postValidData.length - 1);

    return postValidData[index];
  }
}

export default AprioriPool;
