const { getPath, getHttpPort, getDist } = require("../util/index");
const assert = require("assert");

test(`path 为空时报错`, () => {
  assert.throws(() => {
    getPath(``);
  });
});

test(`path转换`, () => {
  expect(getPath(`D:\/www\/test`)).toBe(`D:/www/test`);
});

test(`port应该存在`, () => {
  expect(getHttpPort()).toBeTruthy();
});

test(`为空时/dist`, () => {
  expect(getDist()).toBe(`/dist`);
});

test(`dist存在时取dist`, () => {
  expect(getDist({ dist: "dist" })).toBe(`dist`);
});

test(`dist存在时取 projectpath, 后者没有dist后缀`, () => {
  expect(getDist({ projectpath: "D:/www/test" })).toBe(`D:/www/test/dist`);
});

test(`dist存在时取 projectpath, 后者有dist后缀`, () => {
  expect(getDist({ projectpath: "D:/www/test/dist" })).toBe(`D:/www/test/dist`);
});
