import { Obligatorisk3Page } from './app.po';

describe('obligatorisk3 App', function() {
  let page: Obligatorisk3Page;

  beforeEach(() => {
    page = new Obligatorisk3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
