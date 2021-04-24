import * as React from "react";
import * as ReactDOM from "react-dom";
import {ChakraProvider, Container, Grid, GridItem, Heading, Input,} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {countDates} from "./count-dates";
import {defaultStartDate, DurationCtx, SelectedDuration, useDuration} from "./store";
import {ContentItem, MidTitle} from "./Style";
import {DurationRow} from "./DurationRow";
import {Explanations} from "./Explanations";
import {ResultBox} from "./ResultBox";

function calculate(startDate: Date, duration: SelectedDuration): ReturnType<typeof countDates>
{
    if (!duration) {
        return [startDate, []]
    }
    return countDates(startDate, duration);
}

function App() {
  const [duration, setDuration] = useDuration();
  const [startDate, setStartDate] = React.useState<Date>(defaultStartDate);
  const [resultDate, explanations] = calculate(startDate, duration);

  return (
    <ChakraProvider>
      <Container centerContent maxWidth={"50rem"}>
        <Heading>Kalkulator terminów</Heading>
        <Heading size="xs">
          Obliczenie terminu według zasad określonych w KPA
        </Heading>
        <DurationCtx.Provider value={{ duration, setDuration }}>
          <Grid templateColumns="1fr 4fr" gap={4}>
            <MidTitle>Data Rozpoczęcia</MidTitle>
            <ContentItem>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                customInput={<Input />}
                monthsShown={2}
                showYearDropdown
                showMonthDropdown
              />
            </ContentItem>
            <MidTitle>Długość</MidTitle>
            <GridItem>
              <DurationRow unit="days" choices={[7, 14, 21, 30, 60, 90]} />
              <DurationRow unit="months" choices={[1, 2, 3, 6, 12]} />
              <DurationRow unit="years" choices={[1, 2, 3, 4]} />
            </GridItem>
            <MidTitle>Rezultat</MidTitle>
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
        </DurationCtx.Provider>
      </Container>
    </ChakraProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
