defmodule Pomerol.Gettext do
  @moduledoc """
  A module providing Internationalization with a gettext-based API.

  By using [Gettext](https://hexdocs.pm/gettext),
  your module gains a set of macros for translations, for example:

      import Pomerol.Gettext

      # Simple translation
      gettext "Here is the string to translate"

      # Plural translation
      ngettext "Here is the string to translate",
               "Here are the strings to translate",
               3

      # Domain-based translation
      dgettext "errors", "Here is the error message to translate"

  See the [Gettext Docs](https://hexdocs.pm/gettext) for detailed usage.
  """
  use Gettext, otp_app: :pomerol

  def supported_locales do
    known = Gettext.known_locales(Pomerol.Gettext)
    allowed = config[:locales]
    Set.intersection(Enum.into(known, HashSet.new), Enum.into(allowed, HashSet.new))
    |> Set.to_list
    # known -- (known -- allowed)
  end

  def config, do: Application.get_env(:pomerol, __MODULE__)
end
