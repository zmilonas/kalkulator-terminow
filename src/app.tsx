import * as React from "react";
import * as ReactDOM from "react-dom";
import { Duration, lastDayOfMonth } from "date-fns";
import { shallowEqual } from "shallow-equal-object";
import DatePicker from "react-datepicker";
import {
  Box,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { countDates, SKIP_REASON, SkippedDay } from "./count-dates";
import "react-datepicker/dist/react-datepicker.css";
import {
  dayOfMonth,
  format,
  formatDuration,
  getHoliday,
  Holiday,
} from "./date-helpers";
import { defaultStartDate, DurationCtx, useDuration } from "./store";

const Explanation = ({ children }) => (
  <Text align={"center"} color={"gray.500"} fontSize={"sm"}>
    {children}
  </Text>
);
const DateExpression = ({ children }) => (
  <Text align={"center"} color={"gray.500"}>
    {children}
  </Text>
);
const Result = ({ children }) => (
  <Text align={"center"} fontSize={"2xl"} mb={4}>
    {children}
  </Text>
);
const Pill = ({ children, ...props }) => (
  <Box px={2} borderRadius={"xl"} cursor={"pointer"} {...props}>
    {children}
  </Box>
);
const SelectedPill = ({ children, ...props }) => (
  <Pill bg={"cyan.500"} color={"white"} {...props}>
    {children}
  </Pill>
);
const MidTitle: React.FC = ({ children }) => (
  <GridItem display="flex" alignItems="center" justifyContent="flex-end">
    {children}
  </GridItem>
);

const ContentItem: React.FC = ({ children }) => (
  <GridItem display="flex" justifyContent="center">
    {children}
  </GridItem>
);

const Entry: React.FC<{ value: Duration }> = ({ value }) => {
  const state = React.useContext(DurationCtx);
  const chosen = shallowEqual(value, state.duration);
  const onClick = () => {
    state.setDuration(!chosen ? value : null);
  };
  const Component = chosen ? SelectedPill : Pill;

  return (
    <Component onClick={onClick}>
      {formatDuration(value, { delimiter: "&nbsp;" })}
    </Component>
  );
};

const DurationRow: React.FC<{ choices: number[]; unit: keyof Duration }> = ({
  choices,
  unit,
}) => {
  const state = React.useContext(DurationCtx);
  const onInputChange = (event) => {
    const val = event?.target?.value;
    if (typeof val !== "string") {
      return;
    }
    if (val === "") {
      state.setDuration(null);
      return;
    }

    const parsed: number = parseInt(val);
    if (isNaN(parsed) || parsed < 1) {
      return;
    }

    state.setDuration({ [unit]: parsed });
  };
  const inputValue = state.duration?.[unit] || "";

  return (
    <HStack justify={"space-between"} width={"100%"}>
      {choices.map((num) => (
        <Entry value={{ [unit]: num }} key={unit + num} />
      ))}
      <Input
        size="xs"
        maxWidth="3rem"
        onChange={onInputChange}
        value={inputValue}
      />
    </HStack>
  );
};

const Explanations: React.FC<{ data: SkippedDay[] }> = ({ data }) => {
  if (!data.length) {
    return null;
  }

  const explanationMap: Record<SKIP_REASON, (d: Date) => string> = {
    [SKIP_REASON.WEEKEND]: (date) =>
      `${dayOfMonth(date)} to ${format(date, "cccc")}`,
    [SKIP_REASON.LAST_DAY_OF_MONTH]: (date) =>
      `Ostatni dzień ${format(date, "MMMM")} to ${dayOfMonth(
        lastDayOfMonth(date)
      )}`,
    [SKIP_REASON.BANK_HOLIDAY]: (date) => {
      const holidayName = (getHoliday(date)[0] as Holiday).name;
      return `${dayOfMonth(date)} to ${holidayName}`;
    },
  };
  const explanations = data.map(({ date, reason }) =>
    explanationMap[reason](date)
  );
  return (
    <Explanation>
      Wyjaśnienie:
      {explanations.map((text) => (
        <p>{text}</p>
      ))}
    </Explanation>
  );
};

const ResultBox: React.FC<{ startDate: Date; duration: Duration }> = ({
  startDate,
  duration,
}) => {
  if (!duration) {
    return (
      <Box width="100%" p={4} borderWidth="1px" borderRadius="sm">
        <DateExpression>długość od daty początkowej to</DateExpression>
        <Result>data terminu</Result>
      </Box>
    );
  }
  const [resultDate, explanations] = countDates(startDate, duration);
  return (
    <>
      <Box p={4} borderWidth="1px" borderRadius="sm" width={"100%"}>
        <DateExpression>
          {formatDuration(duration)} od {format(startDate, "do MMMM yyyy")} to
        </DateExpression>
        <Result>{format(resultDate, "do MMMM yyyy")}</Result>
        <Explanations data={explanations} />
      </Box>
    </>
  );
};

function App() {
  const { duration, setDuration } = useDuration();
  const [startDate, setStartDate] = React.useState<Date>(defaultStartDate);

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
                startDate={startDate || defaultStartDate}
                duration={duration}
              />
            </GridItem>
          </Grid>
        </DurationCtx.Provider>
      </Container>
    </ChakraProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
