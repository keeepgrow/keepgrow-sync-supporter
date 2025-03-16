interface WidgetResponse {
  type: "clock" | "d-day";
  dDay?: {
    date?: string;
    content?: string;
  };
  fontColor: string;
  widgetImage: string;
}

export class Widget {
  type: "clock" | "d-day" = "clock";
  dDay?: {
    date?: string;
    content?: string;
    number?: number;
  } = {
    date: "",
    content: "",
    number: 0,
  };
  fontColor: string = "#333";
  widgetImage: string =
    "https://i.pinimg.com/736x/6e/41/77/6e417732ded642e24703df5397a5d28b.jpg";

  constructor(response?: WidgetResponse) {
    if (!response) {
      return;
    }
    this.type = response.type;
    this.dDay = response.dDay;
    this.fontColor = response.fontColor;
    this.widgetImage = response.widgetImage;

    if (this.type === "d-day" && this.dDay) {
      this.dDay.number = Widget.getDdayNumber(this.dDay.date);
    }
  }

  static getDdayNumber(date: string): number {
    const now = new Date();
    const target = new Date(date);
    const diff = target.getTime() - now.getTime();
    const day = diff / (1000 * 60 * 60 * 24);
    return Math.ceil(day) - 1;
  }
}
