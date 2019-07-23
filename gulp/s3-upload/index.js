const gulp = require('gulp');
const awspublish = require('gulp-awspublish');
const awsKey = require('../../awsaccess.json');
const accessKeyId = awsKey.accessKeyId;
const secretAccessKey = awsKey.secretAccessKey;

const awsConfig = awsKey;

const deploy = conf => (env, noCache = false) => {
  const aws = {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: awsConfig.region,
    distributionId: awsConfig[env].distributionId,
    params: {
      Bucket: awsConfig[env].Bucket
    }
  }

  const publisher = awspublish.create(aws);
  const maxAge = env === 'test' ? 0 : 86400;
  const normalHeaders = {
    'Cache-Control' : 'max-age=' + maxAge + ', no-transform, public, no-cache',
    'x-amz-acl': 'private'
  };

  const noCacheHeaders = {
    'Cache-Control' : 'max-age=0 , no-transform, public, no-cache, no-store, must-revalidate',
    // edge cache 를 통해서만 접근 하도록 한다.
    'x-amz-acl': 'private',
  };

  const headers = noCache ? noCacheHeaders : normalHeaders;

  return gulp.src(conf.src)
             .pipe(awspublish.gzip())
             .pipe(publisher.publish(headers, {
               force: noCache
             }))
             .pipe(awspublish.reporter())
};

const spaUpload = upload({
  src: [
    './dist/**/*',
    '!.dist/index.html'
  ]
});

const spaIndexUpload = upload({
  src: [
    './dist/index.html',
  ]
});

gulp.task('upload:static:test', () => spaUpload('test'));
gulp.task('upload:static:prod', () => spaUpload('prod'));
gulp.task('upload:index:test', () => spaIndexUpload('test', true));
gulp.task('upload:index:prod', () => spaIndexUpload('prod', true));

gulp.task('deploy:test', gulp.series('upload:static:test', 'upload:index:test'));
gulp.task('deploy:prod', gulp.series('upload:static:prod', 'upload:index:prod'));
