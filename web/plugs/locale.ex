defmodule Pomerol.Plug.Locale do
  import Plug.Conn

  def init(default), do: default

  def call(conn, _default) do
    handle_locale(conn, conn.assigns[:current_user])
  end

  defp handle_locale(conn, %Pomerol.User{locale: nil}), do: handle_locale(conn, nil)

  defp handle_locale(conn, %Pomerol.User{locale: loc}) do
    assign_locale(conn, loc)
  end

  defp handle_locale(conn, nil) do
    supported_locales = Pomerol.Gettext.supported_locales
    locale =
      conn
      |> extract_accept_languages
      |> Enum.filter(&(&1 in supported_locales))
      |> List.first || Pomerol.Gettext.config[:default_locale]

    conn
      |> assign_locale(locale)
  end

  defp extract_accept_languages(conn) do
    case conn |> get_req_header("accept-language") do
      [value | _] ->
        value
        |> String.split(",")
        |> Enum.map(&parse_language_option/1)
        |> Enum.sort(&(&1.quality > &2.quality))
        |> Enum.map(&(&1.tag))
      _ ->
        []
    end
  end

  defp parse_language_option(string) do
    captures =
      ~r/^(?<tag>[\w\-]+)(?:;q=(?<quality>[\d\.]+))?$/i
      |> Regex.named_captures(string)

    quality = case Float.parse(captures["quality"] || "1.0") do
      {val, _} -> val
      _ -> 1.0
    end

    %{tag: captures["tag"], quality: quality}
  end

  defp assign_locale(conn, locale) do #Give locale data to all modules that require it
    Gettext.put_locale(Pomerol.Gettext, locale)
    conn |> assign(:locale, locale)
  end
end
