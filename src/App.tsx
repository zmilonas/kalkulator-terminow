import * as React from "react";
import {ChakraProvider, Container, Grid, GridItem, Heading, Input,} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import {countDates} from "./count-dates";
import {defaultStartDate, DurationCtx, SelectedDuration, useDuration} from "./store";
import {ContentItem, MidTitle} from "./Style";
import {DurationRow} from "./DurationRow";
import {Explanations} from "./Explanations";
import {ResultBox} from "./ResultBox";
import { DateHelperContext } from "./date-helpers";
import * as i18n from './i18n';

function calculate(startDate: Date, duration: SelectedDuration): ReturnType<typeof countDates>
{
    if (!duration) {
        return [startDate, []]
    }
    return countDates(startDate, duration);
}

type AppDependencies = {
  i18n: typeof i18n;
}

export default function App({ i18n }: AppDependencies) {
  const [duration, setDuration] = useDuration();
  const [startDate, setStartDate] = React.useState<Date>(defaultStartDate);
  const [resultDate, explanations] = calculate(startDate, duration);

  return (
    <ChakraProvider>
      <Container centerContent maxWidth={"50rem"}>
        <Heading role={"heading"}>{i18n.t('Limitation calculator')}</Heading>
        <Heading size="xs">
          Obliczenie terminu według zasad określonych w KPA
        </Heading>
        <DurationCtx.Provider value={{ duration, setDuration }}>
          <DateHelperContext.Provider value={{
            format: i18n.formatDate,
            formatDuration: i18n.formatDuration,
          }}>
          <Grid templateColumns="1fr 4fr" gap={4}>
            <MidTitle>{i18n.t('Start date')}</MidTitle>
            <ContentItem>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<Input aria-label={i18n.t('Start date')} />}
                monthsShown={2}
                locale={i18n.locale}
                showYearDropdown
                showMonthDropdown
              />
            </ContentItem>
            <MidTitle>{i18n.t('Duration')}</MidTitle>
            <GridItem aria-label={i18n.t('Duration')} role={'radiogroup'}>
              <DurationRow unit="days" choices={[7, 14, 21, 30, 60, 90]} />
              <DurationRow unit="months" choices={[1, 2, 3, 6, 12]} />
              <DurationRow unit="years" choices={[1, 2, 3, 4]} />
            </GridItem>
            <MidTitle>{i18n.t('Result')}</MidTitle>
            <GridItem>
              <ResultBox
                resultDate={resultDate}
                startDate={startDate || defaultStartDate}
                duration={duration}
              />
            </GridItem>
            <GridItem colStart={2}>
              <Explanations data={explanations} />
            </GridItem>
          </Grid>
          </DateHelperContext.Provider>
        </DurationCtx.Provider>
      </Container>
    </ChakraProvider>
  );
}

