# Custom JSON Schema Flags

In order to improve the usability of Monitor - we've added in support for custom flags
which can be displayed. Some of these are related to a single input, whilst others are
used to define a group of inputs.

The [Monitor API documentation](https://github.com/homes-england/monitor-api) also provides some information on some of these flags

## Single input flags

- `textarea`
  - Uses `<textarea>`
- `britishDate`
  - Uses `<BritishDate>`
- `percentage`
  - Uses `<PercentageWidget>`
- `enumCheckbox`
  - Uses `<EnumCheckboxWidget>`
- `hidden`
  - Hides the field
- `uploadFile`
  - Uses `<UploadFileField>`
- `readonly`
  - Marks the field as disabled
- `readonly_after_return`
  - Marks the field as disabled if the specified number of returns has passed
- `laReadOnly`
  - Marks the field as disabled if the user has the Local Authority Role
- `s151ReadOnly`
  - Marks the field as disabled if the user has the S151 Officer Role
- `currency`
  - Uses `<CurrencyWidget>`
- `radio`
  - Displays them as a radio button

## Input group flags

- `horizontal`
  - Uses `<HorizontalFields>`
- `risk`
  - Uses `<RiskField>`
- `periods`
  - Uses `<PeriodsField>`
- `milestone`
  - Uses `<MilestoneField>`
- `quarterly`
  - Uses `<QuarterlyBreakdown>`
- `numbered`
  - Uses `<NumberedArrayField>`
- `validated`
  - Highlights fields in red when `_valid:false` is given
  - Highlights items in red by default

## Non Input based flags

- `downloadURI`
  - Uses `<DownloadPseudoWidget>`
  - Allows you to specify a link to a static download
