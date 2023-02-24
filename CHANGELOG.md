# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.21.0 - 2023-02-24

### Added

- Added `className` props to `Button` and `Icon` atoms so the consumer can flexibly customize it via `styled` or Tailwind class.
- Added `iconClassName` props to `Button` so consumer can customize its icon.

## 0.20.0 - 2023-02-14

### Added

- Added `className` props to `NavItemMobile` atom so the consumer can flexibly customize it via `styled`

## 0.19.0 - 2023-02-14

### Changed

- Changed behaviour of `Icon` atom's `palette` fill so the consumer can flexibly customize its color

## 0.18.0 - 2023-02-02

### Changed

- Changed behaviour of `Icon` atom's `board` fill so the consumer can flexibly customize its color

## 0.17.0 - 2023-02-02

### Added

- Added `palette` to `Icon` atom

### Changed

- Changed `tootlipOptions` props of `IconButton` molecule to optional

## 0.16.0 - 2023-01-31

### Added

- Added new `size` props of `Avatar` atom named `larger` mapped to 125px

### Fixed

- Fixed props `bolder` of `Text` atom to render correctly in heading type text

## 0.15.1 - 2022-12-19

### Fixed

- Fixed `Button` atom to have flexible height if text is overflow

## 0.15.0 - 2022-12-16

### Added

- Added new icon of `archive` to `Icon` atom

## 0.14.0 - 2022-12-13

### Changed

- Changed `NavItem` atom's outward margin to 0

## 0.13.0 - 2022-12-06

### Added

- Added passing of props `className` to `NavItem` atom so it can be wrapped by `styled` function

## 0.12.0 - 2022-12-05

### Changed

- Changed width and margin of container of `Modal` atom in mobile view

## 0.11.1 - 2022-11-25

### Fixed

- Fixed `Modal` atom so it can accept `width` props to customize its width in mobile screen

## 0.11.0 - 2022-11-24

### Added

- Added new icon named `back` to `Icon` atom
- Added new props of `className` to `Modal` atom to enable `styled-components` customizes it

## 0.10.0 - 2022-11-24

### Added

- Added new icon named `storefront` to `Icon` atom
- Added new props of `activeColor` and `bold` to `NavItemMobile` atom

## 0.9.0 - 2022-10-21

### Changed

- Changed default border radius of `NewCard` molecule

## 0.8.0 - 2022-10-20

### Added

- Added `NewCard` molecule

## 0.7.0 - 2022-10-20

### Added

- Added `IconButton` molecule

## 0.6.0 - 2022-10-19

### Added

- Added `BorderedButtonContainer` molecule

### Changed

- Rephrased wording in changelog entries

### Fixed

- Removed duplicate entries

## 0.5.0 - 2022-10-17

### Added

- Added `IconWithTooltip` molecule
- Added `AttachmentBox` molecule

### Changed

- Updated build process using rollup to accept image resources

## 0.4.0 - 2022-10-13

### Added

- Added `Alert` molecule

### Changed

- Updated typo variable in stories file of `Accordion`
- Updated formatting of component entities in existing changelog entries

## 0.3.2 - 2022-10-13

### Fixed

- Removed extra unnecessary char in Accordion molecule

## 0.3.1 - 2022-10-13

### Changed

- Updated `CHANGELOG.md` heading format

### Fixed

- Fixed syntax error in `Accordion` molecule

## 0.3.0 - 2022-10-12

### Added

- Added `Accordion` molecule
