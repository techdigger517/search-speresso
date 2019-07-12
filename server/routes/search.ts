const { Router } = require('express');
import * as express from 'express';
const xray = require('x-ray');
const path = require('path');

interface IResult {
  title: string;
  link: string;
  description?: string;
  image?: string;
  favicon?: string;
}

const x = xray({
  filters: {
    clean: (value: string) => {
      if (!!value === true) {
        return value.substr(7).split('&sa=U&ved')[0];
      } else {
        return '';
      }
    }
  }
});
const router: express.Router = Router();

router.get('*', (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  res.sendFile(path.resolve('../', 'build/index.html'));
});

router.post('/:query/:start?', (req: express.Request, res: express.Response): void => {
  const { query, start } = req.params;
  x(
    encodeURI(`https://www.google.com/search?q=${query}&start=${!!start 
      ? start 
      : 0}&pws=0&gl=us&gws_rd=cr`
    ),
    'div[class="jfp3ef"]',
    [
      {
        title: '.BNeawe.vvjwJb.AP7Wnd',
        link: 'a@href | clean',
        description: '.BNeawe.s3v9rd.AP7Wnd',
        image: x('a@href | clean', 'meta[property="og:image"]@content'),
        favicon: x('a@href | clean', 'link[rel="icon"]@href')
      }
    ]
  )
    .then((obj: IResult[]) => {
      let len = obj.length - 1;
      for (let i = len; i >= 0; --i) {
        // removes google news links, empty links, etc.
        if (!!obj[i].link === false || obj[i].link.indexOf('http') === -1) {
          obj.splice(i, 1);
        }
      }
      console.log(obj);
      res.send(obj);
    })
    .catch((error: Error) => console.error(error));
});

export const SearchController = router;
