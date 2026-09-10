import React from "react";
import TeamMarquee from "./TeamMarquee";
import TeamCard from "./TeamCard";

/**
 * One category block: "Faculty Advisors", "Final Year Members", etc.
 * Small sections (<= 2 members) are rendered as a clean static row
 * without duplicate marquee cards.
 */
export default function TeamSection({ title, members, direction }) {
  if (!members?.length) return null;

  if (members.length <= 2) {
    return (
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <h2 className="font-heading mb-6 text-lg font-semibold tracking-tight text-[#ECEEF1] md:text-xl">
            {title}
          </h2>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {members.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2 className="font-heading mb-6 text-lg font-semibold tracking-tight text-[#ECEEF1] md:text-xl">
          {title}
        </h2>
      </div>
      <TeamMarquee members={members} direction={direction} />
    </section>
  );
}
