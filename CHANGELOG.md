# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## 0.3.0 - 2016-10-31
### Added
- None.

### Changed
- Rewrote server using Express.

## 0.2.0 - 2016-10-30
### Added
- Added additional tests.
- Added more robust error handling for several conditions.

### Changed
- Refactored server to call handlers for each type of request instead
of using long branches of if-then-else-if logic. Moved each type of
request handler into its own module.
- Changed if-then-else-if dispatch chain to a simple dispatch table
one if-else condition.
- Made NoteStore a more generalized DataStore that will store any JSON
object as long as it contains an "id" to reference it for storage and
retrieval.
- Updated README.md with better definition of API.

## 0.1.0 - 2016-10-28
### Initial preproduction release
- Initial release as lab assignment for CF 401
