import { FormsTestPage } from './app.po';

describe('forms-test App', () => {
  let page: FormsTestPage;

  beforeEach(() => {
    page = new FormsTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
